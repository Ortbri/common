import type { EmailOtpType } from '@supabase/supabase-js';
import type { NextRequest } from 'next/server';

import { redirect } from 'next/navigation';
import { createClient } from '../../../utils/supabase/server';

/**
 * TODO:
 * not really happy about this confirm, takes too long for email so i disabled the
 * need for confirm email for now??
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/user';

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  // redirect('/error');
  console.warn('failure on GET from confirm auth');
}
