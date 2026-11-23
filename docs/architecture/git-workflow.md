
# Git Workflow Documentation

## 1. Project Overview

TrueStock AI uses Git for version control and GitHub
for source code management.

All developers must follow a standardized Git workflow
to maintain code quality, collaboration, and project stability.

## 2. Branch Strategy

The project follows three main branch types.

### Main Branch

- Branch name: main
- Contains stable and tested application versions.
- Only approved changes should be merged into main.

### Development Branch

- Branch name: develop
- Main integration branch for ongoing development.
- Completed features are merged into develop.

### Feature Branches

- Used to develop individual features.
- Created from the develop branch.
- Merged into develop through Pull Requests.

## 3. Branch Naming Conventions

Use the following naming conventions:

| Prefix | Purpose |
|---|---|
| feature/ | New features |
| fix/ | Bug fixes |
| docs/ | Documentation |
| refactor/ | Code improvements |
| test/ | Testing |

Examples:

- feature/user-authentication
- feature/product-management
- feature/inventory-management
- fix/login-validation
- docs/api-documentation

## 4. Commit Message Conventions

Follow the Conventional Commits format:

type: short description

Common commit types:

- feat: New functionality
- fix: Bug fixes
- docs: Documentation changes
- refactor: Code restructuring
- test: Testing changes
- chore: Maintenance tasks

Examples:

- feat: add authentication module
- fix: resolve database connection issue
- docs: update system architecture
- test: add product validation tests

## 5. Pull Request Workflow

1. Switch to the develop branch.
2. Pull the latest changes.
3. Create a feature branch.
4. Implement the feature.
5. Run relevant tests.
6. Commit your changes.
7. Push your feature branch to GitHub.
8. Create a Pull Request targeting develop.
9. Request code review.
10. Merge after approval.

## 6. Code Review Guidelines

Before approving a Pull Request, verify:

- Code correctness
- Project architecture consistency
- Error handling
- Database query correctness
- Security considerations
- Test results
- Documentation updates

## 7. Development Rules

- Never commit .env files.
- Never upload passwords or API keys.
- Avoid committing unfinished features to main.
- Pull the latest changes before development.
- Use meaningful commit messages.
- Test code before submitting Pull Requests.
- Keep documentation updated.

## 8. Standard Git Commands

Check repository status:

    git status

Switch to develop:

    git switch develop

Update local branch:

    git pull origin develop

Create a feature branch:

    git switch -c feature/feature-name

Stage changes:

    git add .

Commit changes:

    git commit -m "feat: describe your changes"

Push feature branch:

    git push -u origin feature/feature-name

## 9. Conclusion

Following this workflow helps the TrueStock AI development
team maintain an organized repository, collaborate efficiently,
and deliver reliable software.
