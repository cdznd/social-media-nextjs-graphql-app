"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FormControl, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function GeneralSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (query.trim()) {
      params.set("search", query.trim());
    } else {
      params.delete("search");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <IconButton onClick={handleSearch} edge="start" sx={{
              border: 'none',
              borderRight: '1px solid white',
              padding: 0,
              height: '80%',
              borderRadius: 0
            }}>
              <SearchRoundedIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        }
        inputProps={{ "aria-label": "search" }}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </FormControl>
  );
}
