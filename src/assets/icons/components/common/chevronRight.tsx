export default function ChevronRight({ fill = "#aaa" }: { fill?: string }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.3295 19.1705C9.76884 19.6098 10.4812 19.6098 10.9205 19.1705L17.2954 12.7955C17.7348 12.3562 17.7348 11.6438 17.2954 11.2045L10.9205 4.82955C10.4812 4.3902 9.76884 4.3902 9.3295 4.82955C8.89017 5.2689 8.89017 5.9811 9.3295 6.42045L14.909 12L9.3295 17.5795C8.89017 18.0188 8.89017 18.7312 9.3295 19.1705Z" fill={fill} />
        </svg>
    );
}

