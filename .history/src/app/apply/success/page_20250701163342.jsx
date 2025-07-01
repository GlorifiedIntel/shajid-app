import { Suspense } from 'react';
import SuccessClientView from './SuccessClientView';

export const dynamic = 'force-dynamic'; // still useful to ensure no static rendering

export default function Page() {
  return (
    <Suspense fallback={<p>Loading success page...</p>}>
      <SuccessClientView />
    </Suspense>
  );
}