variable "aws_access_key_id" {
  type = string
}

variable "aws_secret_access_key" {
  type = string
}

variable "region" {
  type    = string
  default = "eu-west-1"
}

variable "az_count" {
  type        = number
  description = "Number of availability zones to cover in a given AWS region"
  default     = 2
}

variable "image" {
  description = "Docker image to run in the ECS cluster"
  default     = "445220836204.dkr.ecr.eu-west-1.amazonaws.com/etdashboard:latest"

}

variable "port" {
  description = "Port exposed by the docker image to redirect traffic to"
  default     = "3000"
}

variable "desired_count" {
  type        = number
  description = "Number of docker containers to run"
  default     = 2
}

variable "cpu" {
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU units)"
  default     = "256"
}

variable "memory" {
  description = "Fargate instance memory to provision (in MiB)"
  default     = "512"
}

variable "bucket" {
  default = "aws-github-actions"
  type    = string
}

variable "service_name" {
  type    = string
  default = "terraform-et-dash"
}

variable "alb_name" {
  type    = string
  default = "et-dash-alb"
}

variable "ecs_cluster_name" {
  type    = string
  default = "terraform-et-dash"
}

provider "aws" {
  version    = ">= 1.47.0"
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key

  region = var.region
}

terraform {
  backend "s3" {
    encrypt = true
    key     = "terraform.github.state/dashboard"
  }
}
