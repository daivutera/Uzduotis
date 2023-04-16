import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { updateGridAtom, newInputValuesAtom } from './formContainer.atoms';
import { Grid as PathfindingGrid } from 'pathfinding';

const Grid = () => {
  const [updateGrid, setUpdateGrid] = useAtom(updateGridAtom);
  const [newInputValue] = useAtom(newInputValuesAtom);
  const initialValues = { rows: 10, columns: 10 };
  const inputValueGenerated = newInputValue || initialValues;

  const grid = new PathfindingGrid(
    inputValueGenerated.columns,
    inputValueGenerated.rows
  );

  const onClick = (event) => {
    if (
      event.target.classList.contains('bg-start') ||
      event.target.classList.contains('bg-end')
    ) {
      return;
    } else if (event.target.classList.contains('bg-white')) {
      event.target.classList.remove('bg-white');
      grid.setWalkableAt(
        event.target.dataset.column,
        event.target.dataset.row,
        false
      );
      return;
    }
    event.target.classList.add('bg-white');

    grid.setWalkableAt(
      event.target.dataset.column,
      event.target.dataset.row,
      true
    );

    function findConnectedNodes(grid) {
      const connectedNodes = [];
      const visitedNodes = new Set();

      function dfs(row, col) {
        const node = grid.nodes[row][col];
        visitedNodes.add(node);

        const adjacents = [
          [row - 1, col], // Top
          [row + 1, col], // Bottom
          [row, col - 1], // Left
          [row, col + 1], // Right
        ];

        for (const [r, c] of adjacents) {
          if (
            r >= 0 &&
            r < grid.nodes.length &&
            c >= 0 &&
            c < grid.nodes[0].length
          ) {
            const adjacentNode = grid.nodes[r][c];
            if (!visitedNodes.has(adjacentNode) && adjacentNode.walkable) {
              connectedNodes.push([r, c]);
              dfs(r, c);
            }
          }
        }
      }

      // Find connected nodes
      for (let row = 0; row < grid.nodes.length; row++) {
        for (let col = 0; col < grid.nodes[0].length; col++) {
          const node = grid.nodes[row][col];
          if (node.walkable && !visitedNodes.has(node)) {
            connectedNodes.push([row, col]);
            dfs(row, col);
          }
        }
      }

      return connectedNodes;
    }

    function isPathConnected(path) {
      const connectedNodes = findConnectedNodes(grid);
      const markedNodes = Array.from(
        document.querySelectorAll('.bg-white')
      ).map((div) => {
        const row = Number(div.dataset.row);
        const col = Number(div.dataset.column);
        return [row, col];
      });

      // Check if all marked nodes are connected to the path
      for (const node of markedNodes) {
        if (
          !connectedNodes.some(
            ([row, col]) => row === node[0] && col === node[1]
          )
        ) {
          return false;
        }
      }

      // Check if all adjacent pairs of nodes in the path are connected
      for (let i = 0; i < path.length - 1; i++) {
        const [row1, col1] = path[i];
        const [row2, col2] = path[i + 1];

        if (
          Math.abs(row1 - row2) > 1 ||
          Math.abs(col1 - col2) > 1 ||
          (row1 !== row2 && col1 !== col2)
        ) {
          return false;
        }
      }
      return true;
    }
    const connectedNodes = findConnectedNodes(grid);
    const pathConnectedValue = isPathConnected(findConnectedNodes(grid));

    function highlightConnectedNodes(grid, connectedNodes) {
      for (const [row, col] of connectedNodes) {
        const div = document.querySelector(
          `[data-row="${row}"][data-column="${col}"]`
        );
        div.classList.add('bg-yellow-500');
      }
    }

    if (pathConnectedValue) {
      highlightConnectedNodes(grid, connectedNodes);
    }
  };

  const createGridRows = (
    columnIndex,
    randomValueForStart,
    randomValueForEnd,
    rowsNumber,
    columnsNumber
  ) => {
    const gridDivs = [];

    for (let i = 0; i < rowsNumber; i++) {
      const selectGridColor = (row, column) => {
        let colorClass = '';

        colorClass = 'bg-slate-200';
        grid.setWalkableAt(column, row, false);
        if (column === 0 && randomValueForStart === row) {
          colorClass = 'bg-start';

          grid.setWalkableAt(column, row, true);
        }
        if (column === columnsNumber - 1 && randomValueForEnd === row) {
          colorClass = 'bg-end';
          grid.setWalkableAt(column, row, true);
        }
        return colorClass;
      };
      gridDivs.push(
        <div
          key={i}
          id={`grid-row-${i}`}
          data-row={i}
          data-column={columnIndex}
          className={`h-12 w-12 border border-slate-300 ${selectGridColor(
            i,
            columnIndex
          )} hover:bg-slate-100`}
          onClick={onClick}></div>
      );
    }
    return gridDivs;
  };

  const createGridColumns = () => {
    const randomValueForStart = Math.floor(
      Math.random() *
        (inputValueGenerated.rows > 0
          ? inputValueGenerated.rows
          : initialValues.rows)
    );
    const randomValueForEnd = Math.floor(
      Math.random() *
        (inputValueGenerated.rows > 0
          ? inputValueGenerated.rows
          : initialValues.rows)
    );
    document.querySelectorAll('.bg-white').forEach((div) => {
      div.classList.remove('bg-white');
    });
    document.querySelectorAll('.bg-yellow-500').forEach((div) => {
      div.classList.remove('bg-yellow-500');
    });
    const gridColumns = [];

    for (let i = 0; i < inputValueGenerated.columns; i++) {
      gridColumns.push(
        <div key={i} className='h-12 w-12'>
          {createGridRows(
            i,
            randomValueForStart,
            randomValueForEnd,
            inputValueGenerated.rows,
            inputValueGenerated.columns
          )}
        </div>
      );
    }
    setUpdateGrid(false);

    return gridColumns;
  };

  useEffect(() => {
    createGridColumns();
  }, [updateGrid]);

  useEffect(() => {
    setUpdateGrid(true);
  }, []);

  const height = `${
    inputValueGenerated.rows > 0
      ? inputValueGenerated.rows * 50
      : initialValues.rows * 50
  }`;

  return (
    <div className={`h-full w-full`}>
      <div
        className={`grid w-full grid-cols-custom2`}
        style={{ height: `${height}px` }}>
        {createGridColumns()}
      </div>
    </div>
  );
};

export default Grid;
