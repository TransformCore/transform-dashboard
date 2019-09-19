locals {
  container_definitions = <<DEFINITION
[
  {
    "cpu": ${var.cpu},
    "image": "${var.image}",
    "memory": ${var.memory},
    "name": "app",
    "networkMode": "awsvpc",
    "pseudoTerminal": true,
    "portMappings": [
      {
        "containerPort": ${var.port},
        "hostPort": ${var.port}
      }
    ]
  }
]
DEFINITION
}

resource "aws_ecs_task_definition" "app" {
  family = "app"
  network_mode = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu = var.cpu
  memory = var.memory
  task_role_arn = "arn:aws:iam::445220836204:role/ecsInstanceRole"
  execution_role_arn = "arn:aws:iam::445220836204:role/ecsInstanceRole"

  container_definitions = local.container_definitions
}

resource "aws_ecs_service" "main" {
  name = var.service_name
  cluster = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count = var.desired_count
  launch_type = "FARGATE"

  network_configuration {
    security_groups = [aws_security_group.ecs_tasks.id]
    subnets = aws_subnet.private.*.id
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.app.id
    container_name = "app"
    container_port = var.port
  }

  depends_on = [
    "aws_alb_listener.front_end",
  ]
}
