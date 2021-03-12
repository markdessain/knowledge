---
id: scala
title: Scala
---

## Introduction

## Simple Scala Web Application

The following is a very simple API based on scala and akka.

```scala
// build.sbt
name := "example-scala-app"

version := "1.7"

scalaVersion := "2.12.12"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor" % "2.6.10",
  "com.typesafe.akka" %% "akka-stream" % "2.6.10",
  "com.typesafe.akka" %% "akka-http" % "10.2.1",
  "com.typesafe.akka" %% "akka-http-spray-json" % "10.2.1",

  "com.github.tototoshi" %% "scala-csv" % "1.3.6",

  "org.json4s" %% "json4s-jackson" % "3.6.10"
)

```

```scala
// Main.scala
import akka.actor.ActorSystem
import akka.http.scaladsl.Http

import scala.concurrent.duration._
import akka.http.scaladsl.server.directives.Credentials

import scala.concurrent.Await
import scala.util.{Failure, Success}
import com.github.tototoshi.csv._
import akka.http.scaladsl.server.Directives
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import spray.json._

class Api extends Directives {

  val route = concat(
    pathPrefix("") {
      pathEndOrSingleSlash {
        get {
          complete("Index")
        }
      }
    },
  )
}

object Main extends App {

      implicit val system: ActorSystem = ActorSystem(name = "api")
      import system.dispatcher

      val binding = Http().newServerAt("0.0.0.0", 80).bind(new Api().route)

      binding.onComplete {
        case Success(_) => println("Success!")
        case Failure(error) => println(s"Failed: ${error.getMessage}")
      }

      Await.result(binding, 3.seconds)

}

```
