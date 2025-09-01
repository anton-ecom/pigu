
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
      price: 99,
      currency: 'EUR',
      period: 'month',
      url: '/contacts',
      cta: 'Request Demo',
      features: [
        { name: 'Products', enabled: true, value: 'up to 1000' },
        { name: 'Real-time Updates', enabled: true },
        { name: 'Basic Reporting', enabled: true },
        { name: 'Email Support', enabled: true },
        { name: 'Price Auto-correction', enabled: false },
        { name: 'Advanced Analytics', enabled: false },
        { name: 'API Access', enabled: false },
        { name: 'Custom Integrations', enabled: false },
        { name: 'Priority Support', enabled: false },
        { name: 'AI', enabled: false },
      ]
    },
    {
      type: 'cloud',
      level: 'pro',
      name: 'Cloud Pro',
      description: 'For growing businesses with advanced needs',
      price: 399,
      currency: 'EUR',
      period: 'month',
      cta: 'Request Demo',
      url: '/contacts',
      highlighted: true,
      features: [
        { name: 'Products', enabled: true, value: 'up to 10,000' },
        { name: 'Real-time Updates', enabled: true },
        { name: 'Basic Reporting', enabled: true },
        { name: 'Email Support', enabled: true },
        { name: 'Price Auto-correction', enabled: true },
        { name: 'Advanced Analytics', enabled: true },
        { name: 'API Access', enabled: false },
        { name: 'Custom Integrations', enabled: false },
        { name: 'Priority Support', enabled: false },
        { name: 'Artificial Intelligence', enabled: false },
        { name: 'Fulfillment by Pigu (FBP)', enabled: false },

      ]
    },
    {
      type: 'cloud',
      level: 'ultimate',
      name: 'Cloud Ultimate',
      description: 'Enterprise solution with unlimited capabilities',
      price: 699,
      currency: 'EUR',
      period: 'month',
      cta: 'Contact Sales',
      url: '/contacts',
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
        { name: 'Fulfillment by Pigu (FBP)', enabled: true },
        { name: 'Artificial Intelligence', enabled: true },
      ]
    }
  ],
  onPremise: [
    {
      type: 'on-premise',
      level: 'start',
      name: 'On-Premise Start',
      description: 'Self-hosted solution for data control',
      price: 1999,
      currency: 'EUR',
      period: 'month',
      url: '/contacts',
      cta: 'Contact Sales',
      features: [
        { name: 'Products', enabled: true, value: 'up to 10,000' },
        { name: 'Real-time Updates', enabled: true },
        { name: 'Basic Reporting', enabled: true },
        { name: 'Email Support', enabled: true },
        { name: 'Integration', enabled: true },
        { name: 'Price Auto-correction', enabled: false },
        { name: 'Advanced Analytics', enabled: false },
        { name: 'API Access', enabled: false },
        { name: 'Custom Integrations', enabled: false },
        { name: 'Priority Support', enabled: false },
        { name: 'Fulfillment by Pigu (FBP)', enabled: false },
        { name: 'Artificial Intelligence', enabled: false },
      ]
    },
    {
      type: 'on-premise',
      level: 'pro',
      name: 'On-Premise Pro',
      description: 'Advanced self-hosted with premium features',
      price: 3999,
      currency: 'EUR',
      period: 'month',
      url: '/contacts',
      cta: 'Contact Sales',
      features: [
        { name: 'Products', enabled: true, value: 'up to 50,000' },
        { name: 'Real-time Updates', enabled: true },
        { name: 'Basic Reporting', enabled: true },
        { name: 'Email Support', enabled: true },
        { name: 'Integration', enabled: true },
        { name: 'Price Auto-correction', enabled: true },
        { name: 'Advanced Analytics', enabled: true },
        { name: 'API Access', enabled: true },
        { name: 'Priority Support', enabled: true },
        { name: 'Fulfillment by Pigu (FBP)', enabled: false },
        { name: 'Artificial Intelligence', enabled: false },
      ]
    },
    {
      type: 'on-premise',
      level: 'ultimate',
      name: 'On-Premise Ultimate',
      description: 'Full enterprise deployment with white-label',
      price: 6999,
      currency: 'EUR',
      period: 'month',
      cta: 'Contact Sales',
      url: '/contacts',
      highlighted: true,
      features: [
        { name: 'Products', enabled: true, value: 'Unlimited' },
        { name: 'Real-time Updates', enabled: true },
        { name: 'Basic Reporting', enabled: true },
        { name: 'Email Support', enabled: true },
        { name: 'Price Auto-correction', enabled: true },
        { name: 'Advanced Analytics', enabled: true },
        { name: 'API Access', enabled: true },
        { name: 'Custom Integrations', enabled: true },
        { name: 'Priority Support', enabled: true },
        { name: 'Fulfillment by Pigu (FBP)', enabled: false },
        { name: 'Artificial Intelligence', enabled: false },
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
