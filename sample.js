import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";

async function main() {
  console.clear();

  p.intro(`${color.bgCyan(color.black(" create-app "))}`);

  const project = await p.group(
    {
      name: () =>
        p.text({
          message: "What is your name?",
          placeholder: "Mrinmoy Porel",
          validate: (value) => {
            if (!value) return "Please enter a name.";
            if (value.length < 2)
              return "Name should have atleast two characters.";
          },
        }),
      age: ({ results }) =>
        p.text({
          message: `👋 Hey ${results.name}! How old are you?`,
          placeholder: "18",
          validate: (value) => {
            if (!value) return "Please enter your age.";
            if (!Number(value) > 0) return "Age should be at least 1 year.";
          },
        }),
      adventure: ({ results }) =>
        p.select({
          message: `${results.name}, Which adventure would you like?`,
          initialValue: "easy",
          options: [
            { value: "easy", label: "👶 Easy" },
            { value: "medium", label: "👦 Medium" },
            { value: "hard", label: "👨 Hard", hint: "oh no" },
          ],
        }),
      install: ({ results }) =>
        p.confirm({
          message: `You're too ${
            results.age > 25 ? "old" : "young"
          } for the hard level. Are you sure?`,
          initialValue: false,
        }),
    },
    {
      onCancel: () => {
        p.cancel("Don't be a quitter!");
        process.exit(0);
      },
    }
  );

  if (project.install) {
    const s = p.spinner();
    s.start(`Initializing ${project.adventure} level.`);
    await setTimeout(2500);
    s.stop(`Time to start the ${project.adventure} level.`);
  }

  let nextSteps = `Get yourself a walking stick, ${project.name}.        \nAnd get your butt moving.`;

  p.note(nextSteps, "Next steps.");

  p.outro(
    `Problems? ${color.underline(color.cyan("https://example.com/issues"))}`
  );
}

main().catch(console.error);
