import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  ThemeIcon,
  rem,
} from '@mantine/core';
import { IconBrandMatrix, IconMathFunction ,IconSquareRoot2 } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const mockdata = [
  {
    title: 'Root Of Equation',
    description:'The roots of a quadratic equation are the values of the variable that satisfy the equation. They are also known as the "solutions" or "zeros" of the quadratic equation.',
    icon: IconSquareRoot2,
    gradient:{ from: 'indigo', to: 'cyan' },
    link:"/rootofequation"
  },
  {
    title: 'Linear Agrebraic Equation',
    description:'A linear equation is an equation in which the highest power of the variable is always 1. It is also known as a one-degree equation. The standard form of a linear equation in one variable is of the form Ax + B = 0. Here, x is a variable, A is a coefficient and B is constant. The standard form of a linear equation in two variables is of the form Ax + By = C. Here, x and y are variables, A and B are coefficients and C is a constant.',
    icon: IconBrandMatrix,
    gradient:{ from: 'teal', to: 'lime', deg: 105 },
    link:"#"
  },
  {
    title: 'Least Square Regression',
    description:'The least-squares method is a statistical method used to find the line of best fit of the form of an equation such as y = mx + b to the given data. The curve of the equation is called the regression line. Our main objective in this method is to reduce the sum of the squares of errors as much as possible.',
    icon: IconMathFunction,
    gradient:{ from: 'teal', to: 'blue', deg: 60 },
    link:"#"
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
    transition: 'transform 150ms ease, box-shadow 100ms ease',
    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.02)',
    },
  },

  link:{
    textDecoration:"none"
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

export default function Home() {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Link to={feature.link} key={feature.title} className={classes.link}>
      <Card  shadow="md" radius="md" className={classes.card} padding="xl">
        {/* <Badge variant="gradient" gradient={feature.gradient}>
          {feature.title}
        </Badge> */}
        <ThemeIcon
          size="xl"
          radius="md"
          variant="gradient"
          gradient={{ deg: 0, from: 'blue', to: 'cyan' }}
        >
          <feature.icon size={rem(28)} stroke={1.5} />
        </ThemeIcon>
        <Text fz="lg" fw={500} className={classes.cardTitle} mt="md" sx={{
          '&::after': {
            backgroundColor: theme.fn.linearGradient(0, feature.gradient.from, feature.gradient.to),
          },
        }}>
          {feature.title}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          {feature.description}
        </Text>
      </Card>
    </Link>
  ));

  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Numerical Method
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        A numerical method is an approximate computer method for solving a mathematical problem which often has no analytical solution.
      </Text>
      <Group position='center'>
        <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {features}
        </SimpleGrid>
      </Group>
    </Container>
  );
}