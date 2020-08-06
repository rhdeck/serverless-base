
<a name="readmemd"></a>


# @raydeck/serverless-base - v1.0.2

# Usage
```bash
serverless-base [options] [command]
```
# Options
* -p --path \<`path`> Working path for serverless package context (default: /Users/ray/Documents/GitHub/serverless-base
# Commands
## show
Show the serverless configuration for this package
## set \<`key`> \<`value`>
Update a single key to a specific value
### Options
* -t --targetFile \<`filename`> File to update - one of package.json or .serverlessrc (default: .serverlessrc
* -j --json Treat value as JSON string 

## Index

### Functions

* [getServerlessConfig](#getserverlessconfig)
* [updateServerlessConfig](#updateserverlessconfig)
* [writeServerlessConfig](#writeserverlessconfig)

## Functions

###  getServerlessConfig

▸ **getServerlessConfig**(`path`: string): *object*

*Defined in [index.ts:5](https://github.com/rhdeck/serverless-base/blob/8fc5496/src/index.ts#L5)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`path` | string | process.cwd() |

**Returns:** *object*

* \[ **key**: *string*\]: any

___

###  updateServerlessConfig

▸ **updateServerlessConfig**(`configUpdates`: object, `path`: string, `targetFile`: "package.json" | ".serverlessrc"): *void*

*Defined in [index.ts:49](https://github.com/rhdeck/serverless-base/blob/8fc5496/src/index.ts#L49)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`configUpdates` | object | - |
`path` | string | process.cwd() |
`targetFile` | "package.json" &#124; ".serverlessrc" | ".serverlessrc" |

**Returns:** *void*

___

###  writeServerlessConfig

▸ **writeServerlessConfig**(`newConfigMap`: object, `path`: string, `targetFile`: "package.json" | ".serverlessrc"): *void*

*Defined in [index.ts:28](https://github.com/rhdeck/serverless-base/blob/8fc5496/src/index.ts#L28)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`newConfigMap` | object | - |
`path` | string | process.cwd() |
`targetFile` | "package.json" &#124; ".serverlessrc" | ".serverlessrc" |

**Returns:** *void*
