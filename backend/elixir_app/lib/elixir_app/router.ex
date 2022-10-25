defmodule ElixirApp.Router do
  # Bring Plug.Router module into scope
  use Plug.Router

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

  # Handler for GET request with "/" path
  get "/api/users" do
    res = Postgrex.query!(:postgrex, "SELECT * FROM users", [])

    users = res.rows
      |> Enum.to_list()
      |> Jason.encode!()

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, users)
  end

  get "/api/tasks" do
    res = Postgrex.query!(:postgrex, """
      SELECT "task".*, json_build_object('id', "user"."id", 'image_url' ,"user"."image_url") as "user" FROM "tasks" as "task"
        LEFT JOIN "users" as "user" on "user"."id" = "task"."user_id"
        WHERE "task"."status" != 'deleted'
        GROUP BY "task"."id", "user"."id"
    """, [])

    tasks = res.rows
            |> Enum.to_list()
            |> Jason.encode!()

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, tasks)
  end

  post "/api/tasks" do
    {status, body} =
      case conn.body_params do
        %{"name" => nm} -> {200, nm}
        _ -> {422, "err"}
      end

    send_resp(conn, status, body)
  end

  # Fallback handler when there was no match
  match _ do
    send_resp(conn, 404, "Not Found")
  end
end