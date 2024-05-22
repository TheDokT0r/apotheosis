import {
  Box,
  Collapse,
  Divider,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import type { AbilityData } from "./abilitiesHelper";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDowIcon from "@mui/icons-material/KeyboardArrowDown";

interface RowProps {
  ability?: AbilityData;
}

export default function Row({ ability }: RowProps) {
  const [open, setOpen] = useState(false);

  if (!ability) return null;

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expend row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDowIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ fontSize: "1.2rem" }}>
          {ability.name}
        </TableCell>
        <TableCell align="justify" sx={{ fontSize: "1.2rem" }}>
          {ability.rank}
        </TableCell>
        <TableCell align="justify" sx={{ fontSize: "1.2rem" }}>
          {ability.skill}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Divider variant="middle" />
              <Typography variant="body1" gutterBottom>
                {ability.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Prerequisites
              </Typography>
              <Divider variant="middle" />
              <Typography variant="body1" gutterBottom>
                {ability.prerequisite
                  ? ability.prerequisite.join(", ")
                  : "None"}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
