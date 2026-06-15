1. **Redrawing the whole paper when typing (Performance Lag)**: Every time we write a single letter in the textbox, the computer throws away the whole board and redraws all the columns from scratch, which makes the app tired and slow. We can fix this by putting the textbox in its own small component so only the textbox updates when we type.

2. **Flickering boxes when dragging (Drag-and-Drop UX bug)**: When we drag a chore card and hover over another card inside a column, the column highlight blinks on and off. We can fix this by telling the computer to ignore hover events on the cards themselves while we are dragging.

3. **Crashing when the secret storage box is full (LocalStorage Risk)**: When the app tries to save your chores in the browser's hidden drawer, it can crash if the drawer is full or locked (like in private browsing). We can fix this by wrapping the save code in a safety net that catches errors so the app never crashes.
