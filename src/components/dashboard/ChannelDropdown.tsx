
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChannelOption {
  value: string;
  label: string;
  color?: string;
}

interface ChannelDropdownProps {
  channels: ChannelOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ChannelDropdown({
  channels,
  value,
  onChange,
  placeholder = "Select channel",
  disabled = false
}: ChannelDropdownProps) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Channels</SelectItem>
        {channels.map((channel) => (
          <SelectItem key={channel.value} value={channel.value}>
            <div className="flex items-center gap-2">
              {channel.color && (
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: channel.color }}
                />
              )}
              {channel.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
