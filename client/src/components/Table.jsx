import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const MuiTable = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: { xs: "100%", sm: "50%" },
        margin: "auto",
        mt: 4,
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(135deg, #f0f9ff, #e0e7ff)",
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            }}
          >
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              ID
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Title
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.id}
              sx={{
                "&:nth-of-type(odd)": { backgroundColor: "#f3f4f6" },
                "&:hover": { backgroundColor: "#e0e7ff" },
                transition: "0.3s ease-in-out",
              }}
            >
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MuiTable;
