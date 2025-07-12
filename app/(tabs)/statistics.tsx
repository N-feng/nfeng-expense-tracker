import React, { useState } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	View,
	TouchableOpacity,
	Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For Expo
// If not using Expo, uncomment this:
// import Ionicons from 'react-native-vector-icons/Ionicons';

const interestsData = [
	{
		id: '1',
		category: 'Technology',
		options: [
			{ id: '101', name: 'Programming' },
			{ id: '102', name: 'Artificial Intelligence' },
			{ id: '103', name: 'Mobile Apps' },
			{ id: '104', name: 'Web Development' },
		],
	},
	{
		id: '2',
		category: 'Health & Fitness',
		options: [
			{ id: '201', name: 'Workout' },
			{ id: '202', name: 'Yoga' },
			{ id: '203', name: 'Nutrition' },
			{ id: '204', name: 'Mental Health' },
		],
	},
	{
		id: '3',
		category: 'Entertainment',
		options: [
			{ id: '301', name: 'Movies' },
			{ id: '302', name: 'Music' },
			{ id: '303', name: 'Gaming' },
			{ id: '304', name: 'Books' },
		],
	},
	{
		id: '4',
		category: 'Travel',
		options: [
			{ id: '401', name: 'Adventure' },
			{ id: '402', name: 'City Breaks' },
			{ id: '403', name: 'Luxury Travel' },
			{ id: '404', name: 'Budget Travel' },
		],
	},
	{
		id: '5',
		category: 'Food & Drink',
		options: [
			{ id: '501', name: 'Cooking' },
			{ id: '502', name: 'Restaurants' },
			{ id: '503', name: 'Coffee' },
			{ id: '504', name: 'Cocktails' },
		],
	},
];

export default function InterestsSelectionScreen() {
	// State to track selected interests
	const [selectedInterests, setSelectedInterests] = useState({});

	// Toggle the selection state of an interest
	const toggleInterest = (id) => {
		setSelectedInterests(prevState => ({
			...prevState,
			[id]: !prevState[id]
		}));
	};

	// Check if an interest is selected
	const isSelected = (id) => {
		return selectedInterests[id] === true;
	};

	// Count total selected interests
	const countSelectedInterests = () => {
		return Object.values(selectedInterests).filter(value => value === true).length;
	};

	// Handle continue button press
	const handleContinue = () => {
		const selectedIds = Object.keys(selectedInterests).filter(id => selectedInterests[id]);
		console.log('Selected interests:', selectedIds);
		// Navigate to next screen or process selections
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => {
						// Handle back navigation
						console.log('Go back');
					}}
					style={styles.backButton}>
					<Ionicons name="arrow-back" size={24} color="#333" />
				</TouchableOpacity>

				<Text style={styles.selectedCount}>
					{countSelectedInterests()} selected
				</Text>
			</View>

			<View style={styles.content}>
				<Text style={styles.title}>Your Interests</Text>
				<Text style={styles.subtitle}>
					Select topics that interest you to personalize your experience
				</Text>

				{interestsData.map(category => (
					<View key={category.id} style={styles.categorySection}>
						<Text style={styles.categoryTitle}>{category.category}</Text>

						<View style={styles.optionsGrid}>
							{category.options.map(option => (
								<TouchableOpacity
									key={option.id}
									style={[
										styles.interestOption,
										isSelected(option.id) && styles.interestOptionSelected
									]}
									onPress={() => toggleInterest(option.id)}>
									<Text
										style={[
											styles.interestOptionText,
											isSelected(option.id) && styles.interestOptionTextSelected
										]}>
										{option.name}
									</Text>
									{isSelected(option.id) && (
										<View style={styles.checkIcon}>
											<Ionicons name="checkmark" size={16} color="#FFFFFF" />
										</View>
									)}
								</TouchableOpacity>
							))}
						</View>
					</View>
				))}
			</View>

			<View style={styles.footer}>
				<TouchableOpacity
					style={[
						styles.continueButton,
						countSelectedInterests() === 0 && styles.continueButtonDisabled
					]}
					disabled={countSelectedInterests() === 0}
					onPress={handleContinue}>
					<Text style={styles.continueButtonText}>Continue</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingTop: 16,
		paddingBottom: 8,
	},
	backButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F5F5F7',
	},
	selectedCount: {
		fontSize: 16,
		color: '#666666',
		fontWeight: '500',
	},
	content: {
		flex: 1,
		paddingHorizontal: 24,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#1A1A1A',
		marginBottom: 12,
	},
	subtitle: {
		fontSize: 16,
		color: '#666666',
		marginBottom: 32,
		lineHeight: 22,
	},
	categorySection: {
		marginBottom: 24,
	},
	categoryTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#1A1A1A',
		marginBottom: 16,
	},
	optionsGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginHorizontal: -6,
	},
	interestOption: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F5F5F7',
		borderRadius: 20,
		paddingVertical: 12,
		paddingHorizontal: 20,
		margin: 6,
		minWidth: 100,
	},
	interestOptionSelected: {
		backgroundColor: '#4A6FFF',
	},
	interestOptionText: {
		fontSize: 14,
		fontWeight: '500',
		color: '#333333',
	},
	interestOptionTextSelected: {
		color: '#FFFFFF',
	},
	checkIcon: {
		marginLeft: 6,
	},
	footer: {
		paddingHorizontal: 24,
		paddingVertical: 20,
		borderTopWidth: 1,
		borderTopColor: '#F0F0F0',
	},
	continueButton: {
		height: 52,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#4A6FFF',
		borderRadius: 12,
	},
	continueButtonDisabled: {
		backgroundColor: '#CCCCCC',
	},
	continueButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#FFFFFF',
	},
});