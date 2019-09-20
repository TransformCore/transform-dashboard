workflow "Deploy to ECR" {
  on = "push"
  resolves = ["Deploy to Fargate"]
}

action "Build" {
  uses = "actions/docker/cli@master"
  runs = ["/bin/sh", "-c", "docker build -t $IMAGE ."]
  env = {
    IMAGE = "445220836204.dkr.ecr.eu-west-1.amazonaws.com/etdashboard"
  }
}

action "Login" {
  uses = "actions/aws/cli@master"
  needs = ["Build"]
  env = {
    AWS_DEFAULT_REGION = "eu-west-1"
    AWS_REGION = "$AWS_DEFAULT_REGION"
  }
  runs = ["/bin/sh", "-c", "aws ecr get-login --no-include-email | sh"]
  secrets = [
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
  ]
}

action "Push" {
  uses = "actions/docker/cli@c08a5fc9e0286844156fefff2c141072048141f6"
  needs = ["Login"]
  runs = ["/bin/sh", "-c",  "docker push $IMAGE"]
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
  env = {
    IMAGE = "445220836204.dkr.ecr.eu-west-1.amazonaws.com/etdashboard"
  }

}
