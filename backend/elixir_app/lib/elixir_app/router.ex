defmodule ElixirApp.Router do
  # Bring Plug.Router module into scope
  use Plug.Router

  plug(CORSPlug)

  # Attach the Logger to log incoming requests
  plug(Plug.Logger)

  # Tell Plug to match the incoming request with the defined endpoints
  plug(:match)

  # Once there is a match, parse the response body if the content-type
  # is application/json. The order is important here, as we only want to
  # parse the body if there is a matching route.(Using the Jayson parser)
  plug(Plug.Parsers,
    parsers: [:json],
    pass: ["application/json"],
    json_decoder: Jason
  )

  # Dispatch the connection to the matched handler
  plug(:dispatch)

  get "/api/users" do
    users = ElixirApp.Repository.get_users()

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, users)
  end

  get "/api/tasks" do
    tasks = ElixirApp.Repository.get_tasks()

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, tasks)
  end

  post "/api/tasks" do
    {status, body} =
      case conn.body_params do
        %{"name" => name, "description" => description, "time" => time, "user_id" => user_id} ->
          {200, ElixirApp.Repository.create_task({name, description, time, user_id})}

        _ ->
          {422, "err"}
      end

    send_resp(conn, status, body)
  end

  put "/api/tasks/:id" do
    {id, _} = Integer.parse(id)

    {status, body} =
      case conn.body_params do
        %{
          "name" => name,
          "description" => description,
          "time" => time,
          "user_id" => user_id,
          "status" => status
        } ->
          {200, ElixirApp.Repository.update_task(id, {name, description, time, user_id, status})}

        _ ->
          {422, "err"}
      end

    send_resp(conn, status, body)
  end

  # Fallback handler when there was no match
  match _ do
    send_resp(conn, 404, "Not Found")
  end
end
