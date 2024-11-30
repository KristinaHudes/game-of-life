import {
  ButtonToolbar,
  DropdownButton,
  DropdownItem,
  Button,
} from "react-bootstrap";

interface ButtonsProps {
  actions: {
    play: () => void;
    pause: () => void;
    clear: () => void;
    seed: () => void;
    fast: () => void;
    slow: () => void;
    gridSize: (size: string) => void;
  };
}

export const Buttons: React.FC<ButtonsProps> = ({ actions }) => {
  const handleGridSizeSelect = (size: string | null) => {
    if (size) {
      actions.gridSize(size);
    }
  };

  return (
    <div className="center">
      <ButtonToolbar className="mt-2">
        <Button className="btn btn-light mr-3" onClick={actions.play}>
          Play
        </Button>

        <Button className="btn btn-light mr-3" onClick={actions.pause}>
          Pause
        </Button>

        <Button className="btn btn-light mr-3" onClick={actions.clear}>
          Clear
        </Button>

        <Button className="btn btn-light mr-3" onClick={actions.slow}>
          Slow
        </Button>

        <Button className="btn btn-light mr-3" onClick={actions.fast}>
          Fast
        </Button>

        <Button className="btn btn-light mr-3" onClick={actions.seed}>
          Seed
        </Button>

        <DropdownButton
          title="Grid Size"
          id="size-menu"
          className="success"
          onSelect={handleGridSizeSelect}
        >
          <DropdownItem eventKey="1">20x10</DropdownItem>
          <DropdownItem eventKey="2">50x30</DropdownItem>
          <DropdownItem eventKey="3">70x50</DropdownItem>
        </DropdownButton>
      </ButtonToolbar>
    </div>
  );
};
