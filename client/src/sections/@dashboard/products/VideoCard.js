import PropTypes from "prop-types";
import { Box, Card, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Label from "../../../components/label";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[8],
  },
}));

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  transition: "filter 0.3s ease-in-out",
  "&:hover": {
    filter: "brightness(80%)",
  },
});

const StyledLink = styled(Link)(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

// PropTypes
VideoCard.propTypes = {
  video: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string,
    viewCount: PropTypes.number,
    duration: PropTypes.number,
    status: PropTypes.string,
    recordingDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  }).isRequired,
};

export default function VideoCard({ video }) {
  const {
    title: name,
    thumbnailUrl: cover,
    viewCount,
    duration,
    status,
    recordingDate,
    _id: id,
  } = video;

  const videoDuration = duration ?? 0;

  return (
    <StyledCard>
      <Box sx={{ pt: "100%", position: "relative" }}>
        {status && (
          <Label
            variant="filled"
            color={
              status === "published" ? "success" :
              status === "pending" ? "warning" :
              status === "draft" ? "info" : "default"
            }
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            {status}
          </Label>
        )}
        <StyledLink to={`/videos/${id}`}>
          <StyledProductImg
            alt={name}
            src={cover || "/assets/images/products/product_1.jpg"} // Use thumbnailUrl or fallback
          />
        </StyledLink>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <StyledLink to={`/videos/${id}`} underline="hover">
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </StyledLink>
          <Typography variant="subtitle1">
            <Moment format="DD/MM/YYYY">{recordingDate}</Moment>
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">{viewCount} views</Typography>
          <Typography variant="subtitle1">
            <Moment utc format="HH:mm:ss">
              {videoDuration * 1000}
            </Moment>
          </Typography>
        </Stack>
      </Stack>
    </StyledCard>
  );
}