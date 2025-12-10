# Terraform Coding Guidelines

## General Principles

- Follow HashiCorp Configuration Language (HCL) conventions
- Write in a declarative style
- Make resource dependencies clear
- Separate configurations by environment
- Increase reusability through modularization

## Coding Conventions

### Resource Naming

- Use `snake_case`
- Include environment or project name as prefix
- Use clear names without abbreviations
- Do not repeat resource type in resource names

### Variable Definitions

- Define variables in `variables.tf`
- Always specify `description` and `type`
- Set `default` values when appropriate
- Only parameterize environment-specific values (use `data` blocks for values that can be hardcoded)

## Modularization

### Module Design Principles

- Clearly separate responsibilities (frontend, backend, network, etc.)
- Do not define `provider` blocks in shared modules
- Define `required_providers` in root modules
- Manage inter-module dependencies using `outputs`

## Conditionals and Loops

- Use `count` for conditional resource creation
- Use `for_each` for repeating resource creation
- Pre-calculate complex conditions in separate variables

## Tag Management

- Apply common tags to all resources
- Utilize `default_tags` feature
- Set resource-specific tags appropriately
- Use PascalCase for tags

## Security

### Secrets Management

- Do not commit `.tfvars` files to Git
- Use `TF_VAR_*` environment variables for sensitive information
- Set `sensitive = true` for outputs containing sensitive information
- Leverage AWS Secrets Manager or HashiCorp Vault
