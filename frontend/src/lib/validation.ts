import { z } from "zod";

export const scoreUpdateSchema = z.object({
  participantName: z.string().min(1, "参加者名は必須です"),
  score: z.number().min(0, "スコアは0以上である必要があります"),
});

export const csvRowSchema = z.object({
  participantName: z.string().min(1, "参加者名は必須です"),
  score: z.string().transform((val) => {
    const num = parseFloat(val);
    if (isNaN(num)) {
      throw new Error("スコアは数値である必要があります");
    }
    return num;
  }),
});

export type ScoreUpdateInput = z.infer<typeof scoreUpdateSchema>;
export type CsvRowInput = z.infer<typeof csvRowSchema>;

export function validateCsvData(data: unknown[]): {
  valid: boolean;
  errors: string[];
  validData: ScoreUpdateInput[];
} {
  const errors: string[] = [];
  const validData: ScoreUpdateInput[] = [];

  data.forEach((row, index) => {
    try {
      const parsed = csvRowSchema.parse(row);
      validData.push({
        participantName: parsed.participantName,
        score: parsed.score,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.push(
          `行${index + 1}: ${error.errors.map((e) => e.message).join(", ")}`
        );
      } else if (error instanceof Error) {
        errors.push(`行${index + 1}: ${error.message}`);
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    validData,
  };
}
