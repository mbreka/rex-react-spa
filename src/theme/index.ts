import { Button, rem, Group, MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  components: {
    Button: Button.extend({
      vars: (theme, props) => {
        if (props.size === "xxl") {
          return {
            root: {
              "--button-height": rem(60),
              "--button-padding-x": rem(30),
              "--button-fz": rem(24),
            },
          };
        }

        if (props.size === "xxs") {
          return {
            root: {
              "--button-height": rem(24),
              "--button-padding-x": rem(10),
              "--button-fz": rem(10),
            },
          };
        }

        return { root: {} };
      },
    }),
  },
});

export { theme };
