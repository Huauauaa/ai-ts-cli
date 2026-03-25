#!/usr/bin/env node

function run(): void {
  const args = process.argv.slice(2);
  const nameArg = args.find((arg) => arg.startsWith("--name="));
  const name = nameArg ? nameArg.split("=")[1] : "world";

  if (args.includes("--help") || args.includes("-h")) {
    console.log("Usage: harvey-cli [--name=<name>]");
    return;
  }

  console.log(`Hello, ${name}! This CLI is built with Vite + TypeScript.`);
}

run();
