defmodule ElixirApp.Repository do
  def get_users() do
    Postgrex.query!(:postgrex, "SELECT * FROM users", [])
    |> ElixirApp.Helper.postgrex_res_to_json()
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
    |> ElixirApp.Helper.postgrex_res_to_json()
  end
end
