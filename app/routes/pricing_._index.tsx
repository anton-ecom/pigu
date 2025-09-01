
import type { Route } from "./+types/features_._index";
import {
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import { ErrorMessage } from "@core/components/ErrorMessage";
import IndexLayout from "~/components/IndexLayout";
import DocumentView from "~/components/DocumentView";
import { Pricing } from "~/components/Pricing";
import type { PricingData } from  "~/domain/types/pricing";

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) {
    return [{ title: "Loading..." }];
  }
  return [{ title: 'Pricing' }];
};

const pricingData: PricingData = {
  cloud: [
    {
      type: 'cloud',
      level: 'start',
      name: 'Cloud Start',
      description: 'Perfect for small businesses getting started',
      price: 29,
      currency: 'EUR',
      period: 'month',
      cta: 'Start Free Trial',
      features: [
        { name: 'Orders Processing', enabled: true, value: '1,000/month' },
        { name: 'Real-time Updates', enabled: true },
        { name: 'Basic Reporting', enabled: true },
        { name: 'Email Support', enabled: true },
        { name: 'Price Auto-correction', enabled: false },
        { name: 'Advanced Analytics', enabled: false },
        { name: 'API Access', enabled: false },
        { name: 'Custom Integrations', enabled: false },
        { name: 'Priority Support', enabled: false },
      ]
    },
    {
      type: 'cloud',
      level: 'pro',
      name: 'Cloud Pro',
      description: 'For growing businesses with advanced needs',
      price: 79,
      currency: 'EUR',
      period: 'month',
      cta: 'Upgrade to Pro',
      highlighted: true,
      features: [
        { name: 'Orders Processing', enabled: true, value: '10,000/month' },
        { name: 'Real-time Updates', enabled: true },
        { name: 'Basic Reporting', enabled: true },
        { name: 'Email Support', enabled: true },
        { name: 'Price Auto-correction', enabled: true },
        { name: 'Advanced Analytics', enabled: true },
        { name: 'API Access', enabled: true },
        { name: 'Custom Integrations', enabled: false },
        { name: 'Priority Support', enabled: true },
      ]
    },
    {
      type: 'cloud',
      level: 'ultimate',
      name: 'Cloud Ultimate',
      description: 'Enterprise solution with unlimited capabilities',
      price: 199,
      currency: 'EUR',
      period: 'month',
      cta: 'Contact Sales',
      features: [
        { name: 'Orders Processing', enabled: true, value: 'Unlimited' },
        { name: 'Real-time Updates', enabled: true },
        { name: 'Basic Reporting', enabled: true },
        { name: 'Email Support', enabled: true },
        { name: 'Price Auto-correction', enabled: true },
        { name: 'Advanced Analytics', enabled: true },
        { name: 'API Access', enabled: true },
        { name: 'Custom Integrations', enabled: true },
        { name: 'Priority Support', enabled: true },
      ]
    }
  ],
  onPremise: [
    {
      type: 'on-premise',
      level: 'start',
      name: 'On-Premise Start',
      description: 'Self-hosted solution for data control',
      price: 99,
      currency: 'EUR',
      period: 'month',
      cta: 'Contact Sales',
      features: [
        { name: 'Orders Processing', enabled: true, value: '5,000/month' },
        { name: 'Real-time Updates', enabled: true },
        { name: 'Basic Reporting', enabled: true },
        { name: 'Email Support', enabled: true },
        { name: 'Price Auto-correction', enabled: false },
        { name: 'Advanced Analytics', enabled: false },
        { name: 'API Access', enabled: true },
        { name: 'Custom Integrations', enabled: false },
        { name: 'Priority Support', enabled: false },
      ]
    },
    {
      type: 'on-premise',
      level: 'pro',
      name: 'On-Premise Pro',
      description: 'Advanced self-hosted with premium features',
      price: 299,
      currency: 'EUR',
      period: 'month',
      cta: 'Contact Sales',
      features: [
        { name: 'Orders Processing', enabled: true, value: '50,000/month' },
        { name: 'Real-time Updates', enabled: true },
        { name: 'Basic Reporting', enabled: true },
        { name: 'Email Support', enabled: true },
        { name: 'Price Auto-correction', enabled: true },
        { name: 'Advanced Analytics', enabled: true },
        { name: 'API Access', enabled: true },
        { name: 'Custom Integrations', enabled: true },
        { name: 'Priority Support', enabled: true },
      ]
    },
    {
      type: 'on-premise',
      level: 'ultimate',
      name: 'On-Premise Ultimate',
      description: 'Full enterprise deployment with white-label options',
      price: 599,
      currency: 'EUR',
      period: 'month',
      cta: 'Contact Sales',
      highlighted: true,
      features: [
        { name: 'Orders Processing', enabled: true, value: 'Unlimited' },
        { name: 'Real-time Updates', enabled: true },
        { name: 'Basic Reporting', enabled: true },
        { name: 'Email Support', enabled: true },
        { name: 'Price Auto-correction', enabled: true },
        { name: 'Advanced Analytics', enabled: true },
        { name: 'API Access', enabled: true },
        { name: 'Custom Integrations', enabled: true },
        { name: 'Priority Support', enabled: true },
      ]
    }
  ]
};




/* export async function loader({ params }: Route.LoaderArgs) {
  const fileName = params.id ? params.id : null;

  if (!fileName) {
    throw new Response("Document not found", { status: 404 });
  }

  try {



  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Response(error.message, {
        status: 404,
        statusText: `Document ${fileName} found `,
      });
    }

    throw new Response(`Document ${fileName} not found`);
  }

} */

export default function Index({
      loaderData,
      }: Route.ComponentProps) {
  //const { fileName, content, parsedContent } = loaderData
  return (
    <IndexLayout>
        <Pricing pricingData={pricingData} />
    </IndexLayout>
  );
}

export function ErrorBoundary() {
  //  const error = useAsyncError();

  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <IndexLayout>
        <ErrorMessage title={"Not found"} message={error.statusText} />
      </IndexLayout>
    );
  }

  if (error instanceof Error) {
    return (
      <IndexLayout>
        <ErrorMessage title={"Not found"} message={error.message} />
      </IndexLayout>
    );
  }

  return <ErrorMessage title="Not found" message="Unknown Error" />;
}
