import { createStyles, Paper, Text, ThemeIcon, rem ,SimpleGrid,Container} from '@mantine/core';
import { IconChevronLeft ,IconSquareRoot2 } from '@tabler/icons-react';
import {Link} from 'react-router-dom';
import { data } from '../../components/Detail'
import Header from '../../components/Header';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'transform 150ms ease, box-shadow 100ms ease',
    padding: theme.spacing.xl,
    paddingLeft: `calc(${theme.spacing.xl} * 2)`,

    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.02)',
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: rem(6),
      backgroundImage: theme.fn.linearGradient(0, theme.colors.blue[4], theme.colors.teal[4]),
    },
  },

  link:{
    textDecoration:"none",
  },
  linkBack:{
    textDecoration:"none",
    color:theme.fn.primaryColor(),
    fontWeight:1000
  },

  icon:{
    verticalAlign:"middle",
    height:'20px'
  },

}));

export default function RootTable() {
  const { classes } = useStyles();

  return (
    <Container size="lg" py="xl">
      <Link to="/" className={classes.linkBack}>
        <span><IconChevronLeft className={classes.icon}/>Back to home</span>
      </Link>
      <Header text="Root Of Equation"/>
      <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        {data.map((feature)=>{
          return(
            <Link to={feature.link} className={classes.link}>
              <Paper withBorder radius="md" className={classes.card}>
                <ThemeIcon
                  size="xl"
                  radius="md"
                  variant="gradient"
                  gradient={{ deg: 0, from: 'blue', to: 'teal' }}
                >
                  <IconSquareRoot2 size={rem(28)} stroke={1.5} />
                </ThemeIcon>
                <Text size="xl" weight={500} mt="md">
                  {feature.title}
                </Text>
                <Text size="sm" mt="sm" color="dimmed">
                  {feature.description}
                </Text>
              </Paper>
           </Link>
          )
        })}
      </SimpleGrid>
    </Container>
  );
}