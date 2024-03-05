 enum HookNames {
  AfterStart = 'afterStart',
  BeforeMigrate = 'beforeMigrate',
  AfterMigrate = 'afterMigrate',
}

 interface Hook {
  name: HookNames;
  functions: Function[];
}

const hooks: Hook[] = [];

function registerHook(name: HookNames, fn: Function) {
  const existingHook = hooks.filter((hook) => hook.name === name);
  if (existingHook.length == 0) {
    hooks.push({ name, functions: [] });
  }
  hooks.find((hook) => hook.name === name)!.functions.push(fn);
}

async function callHook(name: HookNames, ...args: any[]) {
  const hook = hooks.find((hook) => hook.name === name);
  if (!hook) {
    return;
  }
  for (const fn of hook.functions) {
    await fn(...args);
  }
}

// Test Functions
registerHook(HookNames.AfterStart, async (args: any[]) => {
  console.log('Application up and running!');
});

registerHook(HookNames.BeforeMigrate, async () => {
  console.log('Connecting to db...');  // Example function 1
});

registerHook(HookNames.AfterMigrate, async () => {
  console.log('Connections sucessful')
  console.log('Db migration completed!');
});


// Calling the Test Functions with empty object passed in
callHook(HookNames.AfterStart, {})
callHook(HookNames.BeforeMigrate, {})
callHook(HookNames.AfterMigrate , {})
module.exports = {registerHook,callHook}