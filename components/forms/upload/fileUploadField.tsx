import { Control } from 'react-hook-form';
import { z } from 'zod';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Progress } from '../../ui/progress';
import { UploadElementSchema } from './schema';

interface FileUploadFieldProps {
  control: Control<z.infer<typeof UploadElementSchema>>;
  name: 'SVGfile' | 'JPGfile' | 'DWGFTfile' | 'DWGMfile';
  label: string;
  accept: string;
  progress: number;
  secondaryProgress?: number;
}

export function FileUploadField({
  control,
  name,
  label,
  accept,
  progress,
  secondaryProgress,
}: FileUploadFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, ref } }) => (
        <FormItem className="space-y-2">
          <FormLabel className="font-bold">{label}</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept={accept}
              onChange={e => onChange(e.target.files?.[0])}
              ref={ref}
            />
          </FormControl>
          <FormMessage />
          {secondaryProgress !== undefined && (
            <FormDescription>Upload progress (private & public)</FormDescription>
          )}
          <div className="space-y-1">
            <Progress value={progress} />
            {secondaryProgress !== undefined && <Progress value={secondaryProgress} />}
          </div>
        </FormItem>
      )}
    />
  );
}
