import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { DotScreenShader } from "@/components/ui/dot-shader-background";

async function ErrorContent({
    searchParams,
}: {
    searchParams: Promise<{ error: string }>;
}) {
    const params = await searchParams;

    return (
        <>
            {params?.error ? (
                <p className="text-sm text-muted-foreground">
                    Code error: {params.error}
                </p>
            ) : (
                <p className="text-sm text-muted-foreground">
                    An unspecified error occurred.
                </p>
            )}
        </>
    );
}

export default function Page({
    searchParams,
}: {
    searchParams: Promise<{ error: string }>;
}) {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <DotScreenShader />
            </div>
            <div className="absolute top-0 w-full z-50">
                <Navbar />
            </div>
            <div className="w-full max-w-sm z-10">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Sorry, something went wrong.
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Suspense>
                                <ErrorContent searchParams={searchParams} />
                            </Suspense>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
