import FAQ from '../../../features/pricing/FAQ';
import Offer from '../../../features/pricing/Offer';

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-10 pt-24">
      <Offer />
      <FAQ />
    </div>
  );
}
