import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IntroductionCardProps {
  title: string;
  description: string;
}
export const IntroductionCard: React.FC<IntroductionCardProps> = ({
  title,
  description,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  );
};
