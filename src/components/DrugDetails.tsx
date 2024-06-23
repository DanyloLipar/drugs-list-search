import { useParams } from "react-router-dom";
import {
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getDrugById } from "../core/api/http";

const DrugDetails = () => {
  const { id } = useParams();

  const {
    data: drug,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["drug", [id]],
    queryFn: () => getDrugById(String(id)),
  });

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Drug details wasn't found.</Typography>;

  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h4">
              {drug?.openfda.brand_name.join(", ")}
            </Typography>
            <Typography variant="h6">
              Generic Name: {drug?.openfda?.generic_name?.join(", ")}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginTop: "4px" }}>
              Manufacturer Name: {drug?.openfda.manufacturer_name?.join(", ")}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginTop: "4px" }}>
              Product Type: {drug?.openfda.product_type?.join(", ")}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "4px" }}>
              {drug?.description}
            </Typography>
            {drug?.dosage_and_administration && (
              <Box sx={{ marginTop: "15px" }}>
                <Typography variant="h6">Dosage and Administration</Typography>
                <Typography variant="body1">
                  {drug?.dosage_and_administration}
                </Typography>
              </Box>
            )}
            {drug?.indications_and_usage && (
              <Box sx={{ marginTop: "8px" }}>
                <Typography variant="h6">Indications and Usage</Typography>
                <Typography variant="body1">
                  {drug?.indications_and_usage}
                </Typography>
              </Box>
            )}
            {drug?.contraindications && (
              <Box sx={{ marginTop: "8px" }}>
                <Typography variant="h6">Contraindications</Typography>
                <Typography variant="body1">
                  {drug.contraindications}
                </Typography>
              </Box>
            )}
            {drug?.warnings && (
              <Box sx={{ marginTop: "8px" }}>
                <Typography variant="h6">Warnings</Typography>
                <Typography variant="body1">{drug?.warnings}</Typography>
              </Box>
            )}
            {drug?.adverse_reactions && (
              <Box sx={{ marginTop: "8px" }}>
                <Typography variant="h6">Adverse Reactions</Typography>
                <Typography variant="body1">
                  {drug?.adverse_reactions}
                </Typography>
              </Box>
            )}
            {drug?.drug_interactions && (
              <Box sx={{ marginTop: "8px" }}>
                <Typography variant="h6">Drug Interactions</Typography>
                <Typography variant="body1">
                  {drug?.drug_interactions}
                </Typography>
              </Box>
            )}
            {drug?.use_in_specific_populations && (
              <Box sx={{ marginTop: "8px" }}>
                <Typography variant="h6">
                  Use in Specific Populations
                </Typography>
                <Typography variant="body1">
                  {drug?.use_in_specific_populations}
                </Typography>
              </Box>
            )}
            {drug?.clinical_pharmacology && (
              <Box sx={{ marginTop: "8px" }}>
                <Typography variant="h6">Clinical Pharmacology</Typography>
                <Typography variant="body1">
                  {drug?.clinical_pharmacology}
                </Typography>
              </Box>
            )}
            {drug?.how_supplied && (
              <Box sx={{ marginTop: "8px" }}>
                <Typography variant="h6">How Supplied</Typography>
                <Typography variant="body1">{drug.how_supplied}</Typography>
              </Box>
            )}
            {drug?.storage_and_handling && (
              <Box sx={{ marginTop: "8px" }}>
                <Typography variant="h6">Storage and Handling</Typography>
                <Typography variant="body1">
                  {drug?.storage_and_handling}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DrugDetails;
