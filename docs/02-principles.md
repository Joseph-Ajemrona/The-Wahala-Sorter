1. **Each toy has its own box (Separation of Concerns)**: We keep the colors and styles in one folder, the main brain code in another, and the starting switch in a different one so they don't get messy and tangled up.

2. **Every helper does only one job (Single Responsibility Principle)**: We write tiny helpers that only do one simple thing, like a clock helper that only reads the time, a theme helper that only flips the light switch, and a delete helper that only throws away one card.

3. **No writing on old drawings, make a new page (Immutability)**: Instead of crossing out or changing the chores on our list directly, we copy the whole list onto a fresh paper and write our changes there, which keeps our lists clean and prevents mistakes.

4. **Lego blocks building (Composition)**: We build our big beautiful board by snapping together small, simple boxes like the header block, the form block, the column block, and the chore card block.

5. **Write it once, use it everywhere (Don't Repeat Yourself / Single Source of Truth)**: We keep all our words and column names in one master list, and we use loops to draw the columns instead of drawing each one by hand, so we only have to change things in one spot if we want to change them later.
