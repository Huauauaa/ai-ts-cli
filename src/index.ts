import { spawnSync } from "node:child_process";

type ToolVersion = {
  label: string;
  command: string;
  args: string[];
  useStderr?: boolean;
};

function readVersion({ label, command, args, useStderr = false }: ToolVersion): string {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.error) {
    return `${label}: not installed`;
  }

  if (result.status !== 0) {
    return `${label}: unavailable`;
  }

  const output = (useStderr ? result.stderr : result.stdout).trim();
  const firstLine = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean);

  return `${label}: ${firstLine ?? "unknown version"}`;
}

function readPythonVersion(): string {
  const pythonCommands: ToolVersion[] = [
    { label: "Python", command: "python3", args: ["--version"] },
    { label: "Python", command: "python", args: ["--version"] },
  ];

  for (const tool of pythonCommands) {
    const result = spawnSync(tool.command, tool.args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });

    if (!result.error && result.status === 0) {
      const output = result.stdout.trim() || result.stderr.trim();
      const firstLine = output
        .split(/\r?\n/)
        .map((line) => line.trim())
        .find(Boolean);

      return `${tool.label}: ${firstLine ?? "unknown version"}`;
    }
  }

  return "Python: not installed";
}

function printEnvironmentVersions(): void {
  const versions = [
    readVersion({ label: "Java", command: "java", args: ["-version"], useStderr: true }),
    readPythonVersion(),
    readVersion({ label: "Node.js", command: "node", args: ["--version"] }),
    readVersion({ label: "npm", command: "npm", args: ["--version"] }),
    readVersion({ label: "pnpm", command: "pnpm", args: ["--version"] }),
    readVersion({ label: "Go", command: "go", args: ["version"] }),
  ];

  console.log("Environment versions:");
  for (const version of versions) {
    console.log(`- ${version}`);
  }
}

function printHelp(): void {
  console.log("Usage: harvey-cli [--name=<name>] [--env-info]");
  console.log("");
  console.log("Options:");
  console.log("  --name=<name>  Print a greeting message.");
  console.log("  --env-info     Print version information for the current environment.");
  console.log("  -h, --help     Show this help message.");
}

function run(): void {
  const args = process.argv.slice(2);
  const nameArg = args.find((arg) => arg.startsWith("--name="));
  const name = nameArg ? nameArg.split("=")[1] : "world";

  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    return;
  }

  if (args.includes("--env-info")) {
    printEnvironmentVersions();
    return;
  }

  console.log(`Hello, ${name}! This CLI is built with Vite + TypeScript.`);
}

run();
