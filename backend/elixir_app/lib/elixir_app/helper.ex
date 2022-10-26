defmodule ElixirApp.Helper do
  def postgrex_res_to_json(data) do
    headers = data.columns |> Enum.with_index

    data.rows
      |> Enum.to_list()
      |> Enum.map(fn task -> map_entity(headers, task) end)
      |> Jason.encode!()
  end

  defp map_entity(headers, entity) do
    Map.new(headers, fn {name, index} -> {name, Enum.at(entity, index)} end)
  end
end