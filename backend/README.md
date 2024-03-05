# Hooks System Documentation
This document describes the hooks.ts file, which implements a flexible hooks system for your application.

## Purpose
The hooks system allows you to execute custom code at specific points in your application's lifecycle or during database migrations. Hooks provide a way to decouple logic from core functionalities and enable customization without modifying core code.

Available Hooks
The system currently provides three built-in hooks:

1. afterStart: Runs after the application successfully starts. This is suitable for initializing services, connecting to databases, or performing any tasks that should happen once after startup.
2. beforeMigrate: Runs before database migrations are applied. This allows you to perform pre-migration actions such as data backups or validation checks.
3. afterMigrate: Runs after database migrations have been applied successfully. This hook is useful for post-migration tasks like data seeding or rebuilding caches.
Usage
Register Hook Functions:

### Use the registerHook function to register functions for a specific hook.
The registerHook function takes two arguments:
hookName: The name of the hook (string) where you want to register the function.
fn: The function you want to execute as part of the hook (HookFunction type).
A HookFunction can be either an asynchronous function returning a Promise or a synchronous function.




# Model Creation CLI

This command-line tool allows you to effortlessly generate new models for your project, streamlining the process of defining database schemas and creating corresponding model classes.

## Features:

Creates a dedicated folder for each model within the models directory.
Generates a basic model class file (ModelName.ts) extending a base Document class (implementation details depend on your database).
Generates a model definition file (ModelName.json) for further customization (specific format depends on your database or ORM).
Simplifies initial model setup, saving development time and ensuring consistent structure.

## Usage:

The CLI provides a single command for model creation:

Bash
 `create-model <modelName>`

`modelName`: Replace this with the desired name for your new model (case-sensitive).




# Model Creation and Management System

This comprehensive system provides a streamlined approach to model creation, validation, and management within your project. It simplifies the process of defining database schemas and ensures consistency across models.

## Key Features:

##Structured Model Organization:
Models reside within dedicated folders following the models/<ModelName> naming convention, promoting organization and clarity.
## Enhanced Model Definition:
Model properties are defined in corresponding JSON files (e.g., User.json), enabling flexible configuration of field types, validation rules, and other metadata.
## Robust Base Class (Document):
The Document base class enforces consistent structure and enforces table naming conventions (e.g., tab<ModelName>), reducing boilerplate and maintaining database integrity.
## Integrated Validations:
The Document base class can be extended to implement validation rules (e.g., required fields) at the model level, ensuring data integrity and raising informative errors during model creation or updates.




# Model Data Retrieval API

This API endpoint provides a flexible and efficient way to retrieve data based on specific model names and criteria. It empowers your application to access and manipulate model data effectively.

## Functionality:

Exposes a RESTful API endpoint for retrieving model data.
Allows filtering results based on user-defined parameters.
Supports selective field retrieval to optimize data transfer and performance.
## Parameters:

Required:

modelName (string): The name of the model to retrieve data from (e.g., User).
Optional:

1. fields (array of strings): A list of specific fields to include in the response (default: ["*"] for all fields).

## Example
`GET /api/models/User?fields=["name", "email"]`




# Commands
`npm run complie` : To complie all typescript to javascript
`npm run cli` : To run test cli
`npm run start` : To start app
