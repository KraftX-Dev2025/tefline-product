import React from "react";
import { FileIcon, ExternalLink, Search, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GOOGLE_DRIVE_FOLDER_URL } from "@/constants/resources";

interface DriveLinkProps {
    searchTerm?: string;
    description?: string;
    showTips?: boolean;
}

export default function DriveLink({
    searchTerm,
    description,
    showTips = false,
}: DriveLinkProps) {
    const encodedSearchTerm = searchTerm ? encodeURIComponent(searchTerm) : "";
    const url = searchTerm
        ? `${GOOGLE_DRIVE_FOLDER_URL}?q=${encodedSearchTerm}`
        : GOOGLE_DRIVE_FOLDER_URL;

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#3CCBC9]/10 rounded-full">
                    <FileIcon className="h-6 w-6 text-[#3CCBC9]" />
                </div>

                <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                        {searchTerm
                            ? `Google Drive: ${searchTerm}`
                            : "Google Drive Resources"}
                    </h3>

                    <p className="text-sm text-gray-500 mb-3">
                        {description ||
                            "Access wellness resources and materials"}
                    </p>

                    <Button
                        variant="outline"
                        size="sm"
                        className="group border-[#3CCBC9]/30 text-[#3CCBC9] hover:bg-[#3CCBC9]/10 hover:border-[#3CCBC9]"
                        asChild
                    >
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                        >
                            <span>Open in Google Drive</span>
                            <ExternalLink
                                size={16}
                                className="ml-2 group-hover:translate-x-0.5 transition-transform"
                            />
                        </a>
                    </Button>

                    {searchTerm && (
                        <div className="mt-3 flex items-center space-x-2 text-xs text-gray-500">
                            <Search size={14} />
                            <span>Search query: "{searchTerm}"</span>
                        </div>
                    )}
                </div>
            </div>

            {showTips && (
                <div className="mt-4 bg-[#3CCBC9]/5 rounded-md p-3">
                    <div className="flex items-start space-x-2">
                        <Info
                            size={16}
                            className="text-[#3CCBC9] mt-0.5 flex-shrink-0"
                        />
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">
                                Search Tips
                            </h4>
                            <ul className="text-xs text-gray-500 space-y-1">
                                <li>
                                    • Use specific health terms to find relevant
                                    documents
                                </li>
                                <li>
                                    • Combine terms like "nutrition sleep" to
                                    find resources addressing both topics
                                </li>
                                <li>
                                    • Use quotation marks for exact phrases,
                                    e.g., "meal planning"
                                </li>
                                <li>
                                    • Filter by file type using 'type:pdf' or
                                    'type:doc' in your search
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
