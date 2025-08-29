export const loader = () => {
  // Return a minimal 404
  throw new Response("Not Found", { status: 404 });
};

export const action = () => {
  // Same for POSTs
  throw new Response("Not Found", { status: 404 });
};

export default function NotFound() {
  // Just in case this renders (for client navigation)
  return <></>;
}
