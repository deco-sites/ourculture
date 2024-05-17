interface Props {
    coupon: string
    description: string
}

export default function Coupon({
    coupon,
    description
}: Props) {
    return (
        <div class="flex flex-col items-center p-6 bg-accent my-5">
            <p class="p-4 text-2xl bg-white rounded-lg font-bold">
                {coupon}
            </p>
            <p class="mt-4 font-bold">
                {description}
            </p>
        </div>
    )
}