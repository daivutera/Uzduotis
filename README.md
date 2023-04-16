### Project for TeleSoftas

created by Daiva Rajackiene

### Dependencies:

"@emotion/react": "^11.10.6",
"@emotion/styled": "^11.10.6",
"@mui/material": "^5.11.16",
"@omer_bhatti/react-keys": "^1.0.1", //for key number generator in elements
"@testing-library/jest-dom": "^5.16.5",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0",
"jotai": "^2.0.4", //for state management
"pathfinding": "^0.4.18", //for grid area setting
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-scripts": "5.0.1",
"web-vitals": "^2.1.4"

### devDependencies

"tailwindcss": "^3.3.1"

### Current bugs:

Path in grid is not calculated to be the fastest one.
Also neighbours are not set properly so sometimes if path is ok, color does not change to yellow.
When the path is found you cannot use the same generated grid, you need to generate the new one because i did not write any functionality for using further the same grid.

### How to start the project:

npm install
