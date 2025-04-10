
import { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ChatPreview } from "../ChatBot/ChatPreview";
import { X, MessageCircle, SendHorizontal } from "lucide-react";

interface WidgetCustomizerProps {
  appearance: {
    primaryColor: string;
    fontFamily: string;
    iconName: string;
    position: "left" | "right";
  };
  updateAppearance: (appearance: {
    primaryColor: string;
    fontFamily: string;
    iconName: string;
    position: "left" | "right";
  }) => void;
}

export const WidgetCustomizer = ({
  appearance,
  updateAppearance,
}: WidgetCustomizerProps) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("message-circle");
  
  const fontFamilies = [
    { value: "Inter", label: "Inter" },
    { value: "Roboto", label: "Roboto" },
    { value: "Arial", label: "Arial" },
    { value: "Open Sans", label: "Open Sans" },
    { value: "Poppins", label: "Poppins" },
    { value: "Lato", label: "Lato" },
    { value: "Montserrat", label: "Montserrat" },
    { value: "Helvetica", label: "Helvetica" },
  ];

  const icons = [
    { name: "message-circle", component: <MessageCircle size={24} /> },
    { name: "send-horizontal", component: <SendHorizontal size={24} /> },
    // In a real app, more icons would be available
  ];

  useEffect(() => {
    updateAppearance({
      ...appearance,
      iconName: selectedIcon,
    });
  }, [selectedIcon]);

  const handleColorChange = (color: any) => {
    updateAppearance({
      ...appearance,
      primaryColor: color.hex,
    });
  };

  const handleFontFamilyChange = (fontFamily: string) => {
    updateAppearance({
      ...appearance,
      fontFamily,
    });
  };

  const handlePositionChange = (position: "left" | "right") => {
    updateAppearance({
      ...appearance,
      position,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Customize Your Widget</h2>
          <p className="text-gray-600">
            Personalize the look and feel of your chat widget to match your brand.
          </p>
        </div>

        <Tabs defaultValue="appearance">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Colors & Branding</CardTitle>
                <CardDescription>
                  Customize the colors and appearance of your chat widget.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-md cursor-pointer border"
                      style={{ backgroundColor: appearance.primaryColor }}
                      onClick={() => setColorPickerVisible(!colorPickerVisible)}
                    ></div>
                    <div className="text-sm">{appearance.primaryColor}</div>
                  </div>
                  {colorPickerVisible && (
                    <div className="relative mt-2">
                      <div className="absolute z-10">
                        <div 
                          className="fixed inset-0" 
                          onClick={() => setColorPickerVisible(false)}
                        ></div>
                        <ChromePicker
                          color={appearance.primaryColor}
                          onChange={handleColorChange}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select
                    value={appearance.fontFamily}
                    onValueChange={handleFontFamilyChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontFamilies.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Chat Icon</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {icons.map((icon) => (
                      <div
                        key={icon.name}
                        className={`border rounded-md p-3 flex items-center justify-center cursor-pointer ${
                          selectedIcon === icon.name
                            ? "border-primary bg-primary/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedIcon(icon.name)}
                      >
                        {icon.component}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Position & Layout</CardTitle>
                <CardDescription>
                  Configure where your chat widget appears on your site.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Widget Position</Label>
                  <RadioGroup
                    defaultValue={appearance.position}
                    onValueChange={(value) => handlePositionChange(value as "left" | "right")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="right" id="right" />
                      <Label htmlFor="right">Bottom Right</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="left" id="left" />
                      <Label htmlFor="left">Bottom Left</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="behavior" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Widget Behavior</CardTitle>
                <CardDescription>
                  Configure how your chat widget interacts with visitors.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Greeting</Label>
                    <p className="text-sm text-gray-500">
                      Send a welcome message when visitors open your site
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Greeting Delay (seconds)</Label>
                    <span className="text-sm text-gray-500">5</span>
                  </div>
                  <Slider
                    defaultValue={[5]}
                    min={0}
                    max={30}
                    step={1}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Display Name Field</Label>
                    <p className="text-sm text-gray-500">
                      Ask visitors for their name before starting chat
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Display Email Field</Label>
                    <p className="text-sm text-gray-500">
                      Ask visitors for their email before starting chat
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="lg:w-80">
        <div className="mb-6">
          <h3 className="text-lg font-medium">Preview</h3>
          <p className="text-sm text-gray-500">
            See how your chat widget will look on your website
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg h-[500px] overflow-hidden relative flex flex-col">
          <div className="flex-1 relative overflow-hidden">
            <div 
              className="absolute w-full h-full bg-white/50 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="text-center p-4">
                <p className="text-sm text-gray-500">Website Content</p>
              </div>
            </div>
          </div>
          
          <ChatPreview 
            primaryColor={appearance.primaryColor} 
            fontFamily={appearance.fontFamily}
            position={appearance.position}
            iconName={appearance.iconName}
          />
        </div>
      </div>
    </div>
  );
};
