import React, { useState } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Grid,
  Container,
  Pagination,
  Button,
} from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getDrugs, queryClient } from "../core/api/http";
import { Drug } from "../core/types/drug";

const DrugList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["drugs", searchTerm, currentPage],
    queryFn: () => getDrugs(searchTerm, currentPage),
    enabled: !!searchTerm,
    placeholderData: keepPreviousData,
  });

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setCurrentPage(1);
      refetch();
      queryClient.resetQueries({ queryKey: ["drugs"] });
    }
  };

  const handlePageChange = (e: any, value: number) => {
    setCurrentPage(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    setCurrentPage(1);
    queryClient.resetQueries({ queryKey: ["drugs"] });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <form>
          <TextField
            fullWidth
            label="Search Drugs by Brand Name"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => handleSearch(e)}
          />
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleClear}
            style={{ marginTop: "10px" }}
          >
            Clear
          </Button>
        </form>
      </Grid>
      <Grid item xs={12}>
        {(isLoading || isFetching) && <CircularProgress />}
        {isError && (
          <Typography variant="body1" color="error">
            This drug wasn't found.
          </Typography>
        )}
        {data && !isFetching && (
          <Container>
            <List>
              {data?.results?.map((drug: Drug) => (
                <ListItem key={drug.id} component="a" href={`/drug/${drug.id}`}>
                  <ListItemText primary={drug.openfda.brand_name.join(", ")} />
                </ListItem>
              ))}
            </List>
            <Pagination
              count={Math.ceil(data.meta.results.total / 10)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              siblingCount={2}
              boundaryCount={1}
              style={{ marginTop: "20px" }}
            />
          </Container>
        )}
        {!data?.results && !isError && !isLoading && (
          <Typography variant="body1">
            Please enter the name of the drug.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default DrugList;
