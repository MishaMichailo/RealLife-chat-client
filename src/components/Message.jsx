import { Box, Text } from "@chakra-ui/react";

export const Message = ({ messageInfo }) => {
    return (
        <Box bg="gray.100" p={3} rounded="md" shadow="sm">
            <Text fontWeight="bold">{messageInfo.userName}</Text>
            <Text>{messageInfo.message}</Text>
        </Box>
    );
};
