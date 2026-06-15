1. **Reading from a locked drawer can crash the app on startup**: If the browser's secret storage drawer is locked when the app first opens, the app will break before drawing anything. We must check the drawer safely.

2. **Broken chores in the drawer can break the board**: If someone puts a weird or broken toy in the storage drawer, the app will crash when trying to play with it. We must check that the toys in the drawer are real, unbroken chores before showing them.

3. **No fallback for fingers or keyboards**: You can only move chores by dragging them with a mouse, but some kids use touch screens or keyboards and cannot drag. We need buttons or selects to move chores without dragging.

4. **Sticky highlight colors**: Sometimes when you stop dragging, a column stays lit up and forgets to turn off its highlight. We need a simpler, cleaner way to turn off the highlights when dragging ends.

5. **Textbox typing still slows down the whole board**: We confirmed that typing a chore name still makes the whole board redraw. We need to split the form into its own component.

6. **Voice readers get confused by delete buttons**: Every delete button says the exact same thing ("Delete Task"), so screen readers can't tell which chore they are about to throw away. We should make each button say the name of the chore it deletes.

7. **A quick flash of the wrong colors**: When you open the app, it might quickly show bright colors before switching to the dark colors you saved. We can fix this with a tiny script in the HTML.

8. **Double coloring rules**: The instructions for coloring the app dark are written twice in our CSS book. We should clean it up and write them only once.

9. **No automatic testing helper**: We do not have any automatic testing robot to make sure our code works before we show it to others. We should add one.

10. **The instruction manual is generic**: The README file still talks about Vite instead of explaining how to run our Wahala Sorter app. We should write a proper instruction manual.
