# elevator-html
A very basic elevator using `HTML`, `CSS`, and `Pure JS`.

Click here to show the project : https://soham023.github.io/Elevator_Control/

## This Elevator App was created based on an assignment.
### The relevant details of which are mentioned below.

1. The home page should consist of the following.
    1. A Lift
    1. 3 levels (Ground level, level 1, level 2)
    1. Up/down buttons on each level.
        1. On Ground level only UP button is allowed
        1. On Level 1 both UP and DOWN buttons are allowed
        1. On Level 2 only DOWN button is allowed
1. On clicking the UP button from Ground level, the elevator should move up. It should take exactly
5 seconds to reach level 1 and 10 seconds to reach level 2.
Conditions:
    1. The elevator should stop at level 1 only if the UP button is pressed on level 1 also.
    2. The elevator should skip level 1 and move to level 2 if the DOWN button is pressed or no
button is pressed on level 1.
1. On clicking the DOWN button from level 2, the elevator should move down. It should take
exactly 5 seconds to reach level 1 and 10 seconds to reach Ground level.
Conditions:
    1. The elevator should stop at level 1 only if the DOWN button is pressed on level 1 also.
    2. The elevator should skip level 1 and move to Ground level if the UP button is pressed or
no button is pressed on level 1.
