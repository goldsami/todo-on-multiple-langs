export function taskController(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({data: [{name: 'test'}, {name: 'test2'}]}))
}