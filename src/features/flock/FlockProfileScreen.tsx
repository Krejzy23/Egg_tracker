import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../../context/LanguageContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getAgeInMonths } from "../../utils/date";
import { getFlockAgeStatus } from "../../utils/flockStat";

import type { FlockGroup } from "./flockTypes";
import { loadFlockGroups, saveFlockGroups } from "./flockStorage";

const emptyForm = {
  breed: "",
  color: "",
  acquiredDate: "",
  count: "",
  note: "",
};

const BREED_OPTIONS = [
  "Sussex",
  "Leghorn",
  "Isa Brown",
  "Dominant",
  "Kalimero",
  "Lohman",
  "Orpington",
  "Australorp",
  "Rhode Island Red",
  "New Hampshire Red",
  "Other",
];

export default function FlockProfileScreen() {
  const navigation = useNavigation();
  const { t, language } = useLanguage();

  const [groups, setGroups] = useState<FlockGroup[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleEditGroup = (group: FlockGroup) => {
    setForm({
      breed: group.breed,
      color: group.color,
      acquiredDate: group.acquiredDate,
      count: String(group.count),
      note: group.note ?? "",
    });

    setEditingGroupId(group.id);
    setIsFormOpen(true);
  };

  useEffect(() => {
    const load = async () => {
      const storedGroups = await loadFlockGroups();
      setGroups(storedGroups);
    };

    load();
  }, []);

  const totalChickens = useMemo(() => {
    return groups.reduce((sum, group) => sum + group.count, 0);
  }, [groups]);

  const handleSaveGroup = async () => {
    const count = Number(form.count);

    if (!form.breed.trim()) {
      Alert.alert(t("flock.alerts.missingBreed"));
      return;
    }

    if (!Number.isFinite(count) || count <= 0) {
      Alert.alert(t("flock.alerts.invalidCount"));
      return;
    }

    let nextGroups: FlockGroup[];

    if (editingGroupId) {
      //  EDIT
      nextGroups = groups.map((g) =>
        g.id === editingGroupId
          ? {
              ...g,
              breed: form.breed,
              color: form.color,
              acquiredDate: form.acquiredDate,
              count,
              note: form.note || undefined,
            }
          : g
      );
    } else {
      //  ADD
      nextGroups = [
        ...groups,
        {
          id: Date.now().toString(),
          breed: form.breed,
          color: form.color,
          acquiredDate: form.acquiredDate,
          count,
          note: form.note || undefined,
        },
      ];
    }

    setGroups(nextGroups);
    await saveFlockGroups(nextGroups);

    setForm(emptyForm);
    setEditingGroupId(null);
    setIsFormOpen(false);
  };

  const handleDeleteGroup = async (id: string) => {
    const nextGroups = groups.filter((group) => group.id !== id);
    setGroups(nextGroups);
    await saveFlockGroups(nextGroups);
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="px-5 pt-4">
          <View className="mb-6 flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-3xl font-bold text-zinc-900">
                {t("flock.title")}
              </Text>

              <Text className="mt-2 text-base text-zinc-500">
                {t("flock.subtitle")}
              </Text>
            </View>

            <Pressable
              onPress={() => navigation.goBack()}
              className="rounded-2xl bg-white p-3 shadow-sm"
            >
              <Ionicons name="chevron-back" size={22} color="#18181b" />
            </Pressable>
          </View>

          <View className="mb-5 rounded-[28px] bg-amber-50 p-5 shadow-lg">
            <View className="flex flex-row items-center justify-between">
              <View>
                <Text className="text-base font-semibold uppercase tracking-wide text-amber-700">
                  {t("flock.overview")}
                </Text>

                <Text className="mt-3 text-4xl font-bold text-zinc-900">
                  {totalChickens} 🐔
                </Text>

                <Text className="mt-1 text-base text-zinc-500">
                  {groups.length} {t("flock.groups")}
                </Text>
              </View>
              <View>
                <Image
                  source={require("../../../assets/flock.png")}
                  className="h-28 w-56 rounded-2xl"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          <View className="mb-5 rounded-[28px] bg-white p-5 shadow-lg">
            <Pressable
              onPress={() => setIsFormOpen((prev) => !prev)}
              className="flex-row items-center justify-between"
            >
              <Text className="text-base font-semibold uppercase tracking-wide text-amber-700">
                {editingGroupId ? t("flock.editGroup") : t("flock.addGroup")}
              </Text>

              <Ionicons
                name={isFormOpen ? "chevron-up" : "add-circle-outline"}
                size={24}
                color="#b45309"
              />
            </Pressable>

            {isFormOpen && (
              <>
                <View className="mt-4 gap-3">
                  <TextInput
                    value={form.breed}
                    onChangeText={(value) =>
                      setForm((prev) => ({ ...prev, breed: value }))
                    }
                    placeholder={t("flock.breed")}
                    placeholderTextColor="#52525b"
                    className="rounded-2xl bg-zinc-100 px-4 py-3 text-base text-zinc-900"
                  />

                  <View className="flex-row flex-wrap gap-2">
                    {BREED_OPTIONS.map((breed) => {
                      const active = form.breed === breed;

                      return (
                        <Pressable
                          key={breed}
                          onPress={() =>
                            setForm((prev) => ({
                              ...prev,
                              breed: breed === "Other" ? "" : breed,
                            }))
                          }
                          className={`rounded-full px-4 py-2 ${
                            active ? "bg-amber-900" : "bg-amber-100"
                          }`}
                        >
                          <Text
                            className={`text-sm font-semibold ${
                              active ? "text-white" : "text-amber-900"
                            }`}
                          >
                            {breed === "Other" ? t("flock.otherBreed") : breed}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>

                  <TextInput
                    value={form.color}
                    onChangeText={(value) =>
                      setForm((prev) => ({ ...prev, color: value }))
                    }
                    placeholder={t("flock.color")}
                    placeholderTextColor="#52525b"
                    className="rounded-2xl bg-zinc-100 px-4 py-3 text-base text-zinc-900"
                  />

                  <Pressable
                    onPress={() => setShowDatePicker(true)}
                    className="rounded-2xl bg-zinc-100 px-4 py-3"
                  >
                    <Text
                      className={
                        form.acquiredDate ? "text-zinc-900" : "text-zinc-600"
                      }
                    >
                      {form.acquiredDate || t("flock.acquiredDate")}
                    </Text>
                  </Pressable>

                  {showDatePicker && (
                    <DateTimePicker
                      value={
                        form.acquiredDate
                          ? new Date(form.acquiredDate)
                          : new Date()
                      }
                      mode="date"
                      display="default"
                      onChange={(_, selectedDate) => {
                        setShowDatePicker(false);

                        if (!selectedDate) return;

                        setForm((prev) => ({
                          ...prev,
                          acquiredDate: selectedDate
                            .toISOString()
                            .split("T")[0],
                        }));
                      }}
                    />
                  )}

                  <TextInput
                    value={form.count}
                    onChangeText={(value) =>
                      setForm((prev) => ({ ...prev, count: value }))
                    }
                    placeholder={t("flock.count")}
                    placeholderTextColor="#52525b"
                    keyboardType="numeric"
                    className="rounded-2xl bg-zinc-100 px-4 py-3 text-base text-zinc-900"
                  />

                  <TextInput
                    value={form.note}
                    onChangeText={(value) =>
                      setForm((prev) => ({ ...prev, note: value }))
                    }
                    placeholder={t("flock.note")}
                    placeholderTextColor="#52525b"
                    multiline
                    className="min-h-20 rounded-2xl bg-zinc-100 px-4 py-3 text-base text-zinc-900"
                  />
                </View>

                <Pressable
                  onPress={handleSaveGroup}
                  className="mt-4 rounded-2xl bg-emerald-700 py-4"
                >
                  <Text className="text-center text-base font-semibold text-white">
                    {t("flock.save")}
                  </Text>
                </Pressable>

                {editingGroupId && (
                  <Pressable
                    className="mt-4 rounded-2xl bg-amber-600 py-4"
                    onPress={() => {
                      setForm(emptyForm);
                      setEditingGroupId(null);
                    }}
                  >
                    <Text className="text-center text-base font-semibold text-white">
                      {t("flock.editGroupCancel")}
                    </Text>
                  </Pressable>
                )}
              </>
            )}
          </View>

          <View className="gap-4">
            {groups.length === 0 ? (
              <View className="rounded-[28px] bg-white p-5 shadow-lg">
                <Text className="text-lg font-bold text-zinc-900">
                  {t("flock.emptyTitle")}
                </Text>
                <Text className="mt-2 text-base text-zinc-500">
                  {t("flock.emptySubtitle")}
                </Text>
              </View>
            ) : (
              groups.map((group) => {
                const groupAge = getAgeInMonths(group.acquiredDate);
                const groupAgeStatus = getFlockAgeStatus(groupAge);

                return (
                  <View
                    key={group.id}
                    className="rounded-[28px] bg-zinc-50 p-5 shadow-lg"
                  >
                    <View className="flex-row items-start justify-between">
                      <View className="flex-1 pr-4">
                        <Text className="text-xl font-bold text-zinc-900">
                          {group.breed}
                        </Text>

                        <Text className="mt-1 text-base font-semibold text-amber-800">
                          {group.count} {t("flock.chickens")}
                        </Text>
                      </View>

                      <View className="flex-row gap-2">
                        <Pressable
                          onPress={() => handleEditGroup(group)}
                          className="rounded-2xl bg-blue-50 p-3"
                        >
                          <Ionicons
                            name="create-outline"
                            size={20}
                            color="#2563eb"
                          />
                        </Pressable>

                        <Pressable
                          onPress={() => handleDeleteGroup(group.id)}
                          className="rounded-2xl bg-red-50 p-3"
                        >
                          <Ionicons
                            name="trash-outline"
                            size={20}
                            color="#dc2626"
                          />
                        </Pressable>
                      </View>
                    </View>

                    <View className="mt-4 gap-2">
                      {!!group.color && (
                        <Text className="text-base text-zinc-600">
                          🎨 {t("flock.colorLabel")}:{" "}
                          <Text className="font-semibold text-zinc-900">
                            {group.color}
                          </Text>
                        </Text>
                      )}

                      {!!group.acquiredDate && (
                        <>
                          <Text className="text-base text-zinc-600">
                            📅 {t("flock.acquiredLabel")}:{" "}
                            <Text className="font-semibold text-zinc-900">
                              {group.acquiredDate}
                            </Text>
                          </Text>

                          <Text className="text-base text-zinc-600">
                            🐣 {t("flock.ageLabel")}:{" "}
                            <Text className="font-semibold text-zinc-900">
                              {groupAge} {t("flock.months")}
                            </Text>
                          </Text>
                        </>
                      )}

                      {!!group.note && (
                        <Text className="text-base leading-6 text-zinc-600">
                          📝 {group.note}
                        </Text>
                      )}
                    </View>

                    <View className="mt-4 rounded-2xl bg-zinc-100 p-3">
                      <Text
                        className={`text-sm font-medium ${groupAgeStatus.color}`}
                      >
                        {groupAgeStatus.text}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
