---
description: Workflow to update the project checklist after completing a task
---

# Update Checklist Workflow

This workflow should be triggered after the completion of any significant engineering task to ensure the project status is always up to date.

1.  **Open Checklist**: Read `docs/check_list.md` to understand the current state.
2.  **Identify Completed Items**: Match the recently completed work (e.g., "Created API Routes", "Implemented Login") with the items in the checklist.
3.  **Update Status**: Change the `[ ]` (unchecked) to `[x]` (checked) for all completed items.
4.  **Verify**: Ensure no items are marked as complete if they still have pending sub-tasks.
5.  **Sync**: If applicable, ensure `task.md` in the artifacts directory is also synchronized.
