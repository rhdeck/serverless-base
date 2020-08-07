
<a name="readmemd"></a>


# @raydeck/serverless-base - v1.0.2

# Usage
```bash
serverless-base [options] [command]
```
# Options
* -p --path \<`path`> Working path for serverless package context (default: `/Users/ray/Documents/GitHub/serverless-base`)
# Commands
## show
Show the serverless configuration for this package
### Usage
```bash
serverless-base show [options]
```
## set \<`key`> \<`value`>
Update a single key to a specific value
### Usage
```bash
serverless-base set [options] <key> <value>
```
### Options
* -t --targetFile \<`filename`> File to update - one of package.json or .serverlessrc (default: `.serverlessrc`)
* -j --json Treat value as JSON string 
## dependency
Subcommands for dependency management
### Usage
```bash
serverless-base dependency [options] [command]
```
### Subcommands
#### add \<`path`>
add a dependency
##### Usage
```bash
serverless-base dependency add [options] <path>
```
#### remove \<`name`>
remove a dependency
##### Usage
```bash
serverless-base dependency remove [options] <name>
```

## Index

### Variables

* [dep](#const-dep)

### Functions

* [getServerlessConfig](#getserverlessconfig)
* [updateServerlessConfig](#updateserverlessconfig)
* [writeServerlessConfig](#writeserverlessconfig)

## Variables

### `Const` dep

• **dep**: *Command‹›* = commander
  .command("dependency")
  .description("Subcommands for dependency management")

*Defined in [bin.ts:29](https://github.com/rhdeck/serverless-base/blob/6490848/src/bin.ts#L29)*

## Functions

###  getServerlessConfig

▸ **getServerlessConfig**(`path`: string): *object*

*Defined in [index.ts:8](https://github.com/rhdeck/serverless-base/blob/6490848/src/index.ts#L8)*

Get the serverless object from package.json, serverless.config.js and .serverlessrc

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`path` | string | process.cwd() | Path to serverless package (default is current path)  |

**Returns:** *object*

* \[ **key**: *string*\]: any

___

###  updateServerlessConfig

▸ **updateServerlessConfig**(`configUpdates`: object, `path`: string, `targetFile`: "package.json" | ".serverlessrc"): *void*

*Defined in [index.ts:64](https://github.com/rhdeck/serverless-base/blob/6490848/src/index.ts#L64)*

Update a serverless config (shallow only - replacing a tree element replaces the whole tree)

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`configUpdates` | object | - | Map of updates to change (e.g. `{name: "newName"}`) |
`path` | string | process.cwd() | Path to the serverless package (default is current dir) |
`targetFile` | "package.json" &#124; ".serverlessrc" | ".serverlessrc" | Whether to update package.json or .serverlessrc - defaults to latter  |

**Returns:** *void*

___

###  writeServerlessConfig

▸ **writeServerlessConfig**(`newConfigMap`: object, `path`: string, `targetFile`: "package.json" | ".serverlessrc"): *void*

*Defined in [index.ts:37](https://github.com/rhdeck/serverless-base/blob/6490848/src/index.ts#L37)*

Save a new config map

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`newConfigMap` | object | - | New set of serverless considerations |
`path` | string | process.cwd() | Path to the serverless package (default current path) |
`targetFile` | "package.json" &#124; ".serverlessrc" | ".serverlessrc" | WHether to amend package.json or recreate .serverlessrc (defaults to the latter)  |

**Returns:** *void*
