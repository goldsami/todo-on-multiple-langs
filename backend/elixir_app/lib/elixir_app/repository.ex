defmodule ElixirApp.Repository do
  def get_users() do
    Postgrex.query!(:postgrex, "SELECT * FROM users", [])
    |> ElixirApp.Helper.parse_postgrex_res()
    |> Jason.encode!()
  end

  def get_tasks() do
    Postgrex.query!(
      :postgrex,
      """
        SELECT "task".*, json_build_object('id', "user"."id", 'image_url' ,"user"."image_url") as "user" FROM "tasks" as "task"
          LEFT JOIN "users" as "user" on "user"."id" = "task"."user_id"
          WHERE "task"."status" != 'deleted'
          GROUP BY "task"."id", "user"."id"
      """,
      []
    )
    |> ElixirApp.Helper.parse_postgrex_res()
    |> Jason.encode!()
  end

  def create_task({name, description, time, user_id}) do
    {_, time, _} = DateTime.from_iso8601(time)

    [value | _] =
      Postgrex.query!(
        :postgrex,
        """
          INSERT INTO tasks (name, description, time, user_id) VALUES ($1, $2, $3, $4) RETURNING *
        """,
        [name, description, time, user_id]
      )
      |> ElixirApp.Helper.parse_postgrex_res()

    Jason.encode!(value)
  end

  def update_task(id, {name, description, time, user_id, status}) do
    {_, time, _} = DateTime.from_iso8601(time)

    [value | _] =
      Postgrex.query!(
        :postgrex,
        """
          UPDATE tasks SET name = $1, description = $2, time = $3, user_id = $4, status = $5 WHERE id = $6 RETURNING *
        """,
        [name, description, time, user_id, status, id]
      )
      |> ElixirApp.Helper.parse_postgrex_res()

    Jason.encode!(value)
  end
      )
      |> ElixirApp.Helper.parse_postgrex_res()

    Jason.encode!(value)
  end
end
