defmodule ElixirApp.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Starts a worker by calling: ElixirApp.Worker.start_link(arg)
      # {ElixirApp.Worker, arg}
      {Plug.Cowboy, scheme: :http, plug: ElixirApp.Router, options: [port: 4000]},
      {Postgrex, name: :postgrex, hostname: "localhost", username: "admin", password: "admin", database: "postgres", port: 5432}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ElixirApp.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
